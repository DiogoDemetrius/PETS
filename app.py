from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash
import os
from dotenv import load_dotenv

# Carrega variáveis de ambiente
load_dotenv()

app = Flask(__name__)
# Configurando CORS para permitir todas as origens
CORS(app, resources={r"/*": {"origins": "*"}})

# Configuração do banco de dados
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '1234',
    'database': 'pets'
}

# Função para conectar ao banco de dados
def get_db_connection():
    return mysql.connector.connect(**db_config)

@app.route('/registrar', methods=['POST'])
def registrar():
    try:
        dados = request.get_json()
        
        # Verifica se todos os campos necessários estão presentes
        campos_necessarios = ['nome', 'nome_usuario', 'senha', 'cpf', 'email']
        for campo in campos_necessarios:
            if campo not in dados:
                return jsonify({'erro': f'Campo {campo} é obrigatório'}), 400
        
        # Hash da senha
        senha_hash = generate_password_hash(dados['senha'])
        
        # Conecta ao banco de dados
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Insere o usuário no banco de dados
        sql = """INSERT INTO usuario (nome, nome_usuario, senha, cpf, email) 
                 VALUES (%s, %s, %s, %s, %s)"""
        valores = (
            dados['nome'],
            dados['nome_usuario'],
            senha_hash,
            dados['cpf'],
            dados['email']
        )
        
        cursor.execute(sql, valores)
        conn.commit()
        
        # Fecha a conexão
        cursor.close()
        conn.close()
        
        return jsonify({'mensagem': 'Usuário registrado com sucesso'}), 201
        
    except mysql.connector.Error as erro:
        return jsonify({'erro': f'Erro no banco de dados: {str(erro)}'}), 500
    except Exception as erro:
        return jsonify({'erro': f'Erro: {str(erro)}'}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        dados = request.get_json()
        
        # Verifica se recebeu nome_usuario e senha
        if not dados or 'nome_usuario' not in dados or 'senha' not in dados:
            return jsonify({'erro': 'Nome de usuário e senha são obrigatórios'}), 400
        
        # Conecta ao banco de dados
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        # Busca o usuário pelo nome_usuario
        sql = "SELECT * FROM usuario WHERE nome_usuario = %s"
        cursor.execute(sql, (dados['nome_usuario'],))
        usuario = cursor.fetchone()
        
        # Fecha a conexão
        cursor.close()
        conn.close()
        
        # Verifica se encontrou o usuário e se a senha está correta
        if usuario and check_password_hash(usuario['senha'], dados['senha']):
            # Remove a senha do objeto antes de retornar
            usuario.pop('senha', None)
            return jsonify({
                'mensagem': 'Login realizado com sucesso',
                'usuario': usuario
            })
        else:
            return jsonify({'erro': 'Nome de usuário ou senha inválidos'}), 401
            
    except Exception as erro:
        return jsonify({'erro': f'Erro no servidor: {str(erro)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)

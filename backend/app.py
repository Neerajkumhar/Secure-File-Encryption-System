from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import io

from encryption import encrypt_data, decrypt_data

app = Flask(__name__)
# Enable CORS for all routes so the frontend can easily communicate
CORS(app)

# Limit file size to 50MB
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024

@app.route('/', methods=['GET'])
def index():
    return jsonify({
        "status": "success",
        "message": "Secure File Encryption System API is running. Use /encrypt or /decrypt endpoints via POST."
    }), 200

@app.route('/encrypt', methods=['POST'])
def encrypt_api():
    if 'file' not in request.files:
        return jsonify({"error": "No file parameter found"}), 400
    
    file = request.files['file']
    password = request.form.get('password')
    
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400
        
    if not password:
        return jsonify({"error": "Password not provided"}), 400

    filename = secure_filename(file.filename)
    file_bytes = file.read()
    
    try:
        encrypted_bytes = encrypt_data(file_bytes, password)
        
        return send_file(
            io.BytesIO(encrypted_bytes),
            mimetype='application/octet-stream',
            as_attachment=True,
            download_name=f"{filename}.enc"
        )
    except Exception as e:
        return jsonify({"error": f"Encryption failed: {str(e)}"}), 500

@app.route('/decrypt', methods=['POST'])
def decrypt_api():
    if 'file' not in request.files:
        return jsonify({"error": "No file parameter found"}), 400
        
    file = request.files['file']
    password = request.form.get('password')
    
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400
        
    if not password:
        return jsonify({"error": "Password not provided"}), 400
        
    file_bytes = file.read()
    
    try:
        decrypted_bytes = decrypt_data(file_bytes, password)
        
        # Determine output filename
        original_name = file.filename
        if original_name.endswith('.enc'):
            original_name = original_name[:-4]
        else:
            original_name = f"decrypted_{original_name}"
            
        return send_file(
            io.BytesIO(decrypted_bytes),
            mimetype='application/octet-stream',
            as_attachment=True,
            download_name=original_name
        )
    except Exception as e:
        return jsonify({"error": "Failed to decrypt. Incorrect password or invalid file."}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)

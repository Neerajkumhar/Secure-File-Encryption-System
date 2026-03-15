import os
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from os import urandom

def generate_key_from_password(password: str, salt: bytes) -> bytes:
    """
    Generate a 32-byte encryption key from a password and salt using PBKDF2HMAC.
    """
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=100000,
        backend=default_backend()
    )
    return kdf.derive(password.encode('utf-8'))

def encrypt_data(data: bytes, password: str) -> bytes:
    """
    Encrypt bytes data using AES-256-CBC.
    Prepends salt and IV to the encrypted data to be extracted during decryption.
    """
    salt = urandom(16)
    key = generate_key_from_password(password, salt)
    iv = urandom(16)
    
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
    encryptor = cipher.encryptor()
    
    # Pad data to be a multiple of the block size (16 bytes)
    padding_length = 16 - (len(data) % 16)
    padded_data = data + bytes([padding_length]) * padding_length
    
    encrypted_data = encryptor.update(padded_data) + encryptor.finalize()
    
    # Return salt + iv + encrypted_data
    return salt + iv + encrypted_data

def decrypt_data(encrypted_content: bytes, password: str) -> bytes:
    """
    Decrypt data previously encrypted with encrypt_data.
    """
    if len(encrypted_content) < 32:
        raise ValueError("Invalid encrypted file or too short.")
        
    salt = encrypted_content[:16]
    iv = encrypted_content[16:32]
    ciphertext = encrypted_content[32:]
    
    key = generate_key_from_password(password, salt)
    
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
    decryptor = cipher.decryptor()
    
    try:
        padded_data = decryptor.update(ciphertext) + decryptor.finalize()
    except Exception as e:
        raise ValueError("Failed to decrypt. Possibly incorrect password or corrupted data.")
    
    # Remove padding
    padding_length = padded_data[-1]
    if padding_length < 1 or padding_length > 16:
        raise ValueError("Invalid padding. Incorrect password.")
        
    original_data = padded_data[:-padding_length]
    return original_data

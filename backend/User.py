# User

class User:
    def __init__(self, user_id: int, username: str, email: str, password: str):
        self.id = user_id
        self.username = username
        self.email = email
        self.password = password
        self.preferred_tags = []
    
    def _get_user_id(self) -> int:
        return self.id
    
    def _get_user_username(self) -> str:
        return self.username
    
    def _get_user_email(self) -> str:
        return self.email
    
    def _get_user_tags(self) -> list:
        return self.email
    
    def _get_as_dict(self) -> dict:
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
    
    def _check_email_pass_combo(self, email: str, password: str) -> bool:
        return self.email == email and self.password == password

from flask import Blueprint, request

bp = Blueprint("user", __name__)

@bp.route("/hello/")      
def index():
    return "Hello, World!"

@bp.route("/user/<name>")
def about(name):
    return f"<h1>Welcome {name} </h1>"

@bp.route('/blog/<int:postID>')
def show_blog(postID):
    return f'<h1>Blog Number {postID}</h1>'

from flask import Flask
app = Flask(__name__)

# Load needed assets 
navbar = open("layouts/nav.html", "r").read()
app_html = open("app.html", "r").read()
head = open("layouts/head.html", "r").read()
skeleton = open("layouts/skeleton.html", "r").read()

@app.route("/", methods=["GET", "POST"])
def index():
    """This function is called to provide the user with something to look at"""
    
    # Load the skeleton
    page = skeleton

    # Load in the page head
    page.replace("{{head}}", head)

    # Load in the app HTML
    page.replace("{{body}}", navbar + app_html)

    # Return the page
    return page
from app.main import app
print([route.path for route in app.routes if hasattr(route, 'methods')])
print([route.name for route in app.routes if hasattr(route, 'methods')])

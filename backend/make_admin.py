"""
Script to promote a user to 'admin' role in the database.
Usage: python make_admin.py <email>
"""
import asyncio
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal
from sqlalchemy.future import select
from models.Users import Users


async def make_admin(email: str):
    async with SessionLocal() as db:
        result = await db.execute(select(Users).filter(Users.email == email))
        user = result.scalars().first()

        if not user:
            print(f"❌ No user found with email: {email}")
            return

        old_role = user.role
        user.role = "admin"
        await db.commit()
        await db.refresh(user)

        print(f"✅ User '{user.username}' ({email}) role changed: '{old_role}' → 'admin'")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python make_admin.py <email>")
        sys.exit(1)

    email = sys.argv[1]
    asyncio.run(make_admin(email))

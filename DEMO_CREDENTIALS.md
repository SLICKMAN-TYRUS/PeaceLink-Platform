# PeaceLink Demo Credentials

**For Demo and Testing Purposes Only**

---

## Admin Access

**Django Admin Panel:** http://127.0.0.1:8000/admin/

- **Username:** `admin`
- **Password:** [Set during superuser creation - use your admin password]

---

## Test User Accounts

All test users have the same password for easy demo access: **`password123`**

### 1. Elder/Community Leader

- **Username:** `chief_makuei`
- **Password:** `password123`
- **Role:** Elder
- **Location:** Juba, Central Equatoria
- **Email:** makuei@example.com
- **Description:** Community elder with wisdom and mediation experience

### 2. NGO Worker

- **Username:** `sarah_nyandeng`
- **Password:** `password123`
- **Role:** NGO
- **Location:** Bor, Jonglei
- **Email:** sarah@ngo.org
- **Description:** NGO coordinator offering vocational training

### 3. Citizen (Malakal)

- **Username:** `james_lual`
- **Password:** `password123`
- **Role:** Citizen
- **Location:** Malakal, Upper Nile
- **Email:** james@example.com
- **Description:** Active community member reporting security concerns

### 4. Citizen (Wau)

- **Username:** `grace_achol`
- **Password:** `password123`
- **Role:** Citizen
- **Location:** Wau, Western Bahr el Ghazal
- **Email:** grace@example.com
- **Description:** Community member reporting infrastructure issues

---

## Quick Demo Flow

### Option 1: Elder Experience
1. Login as `chief_makuei`
2. Navigate to Forums
3. View "Cattle Grazing Disputes Resolution" (pinned topic)
4. Demonstrate audio recording feature
5. Show trust score and verification status

### Option 2: NGO Experience
1. Login as `sarah_nyandeng`
2. Check notifications
3. View scheduled meeting
4. Access reports dashboard
5. Show community poll results

### Option 3: Citizen Experience
1. Login as `james_lual` or `grace_achol`
2. Submit new report
3. Browse forums
4. Access resource library
5. View personal reports

---

## Sample Data Available

- **30 Users** (including 4 primary test accounts above)
- **3 Forum Topics** (Water Crisis, Youth Employment, Cattle Disputes)
- **37 Forum Posts** across topics
- **47 Reports** with various statuses
- **1 Community Poll** with 5 options
- **3 Achievements** (Peacemaker, Helper, Contributor)
- **1 Scheduled Meeting** (Water Infrastructure Crisis Response)

---

## Security Note

**IMPORTANT:** These credentials are for demonstration purposes only. 

- Do NOT use these credentials in production
- Change all passwords before deployment
- Remove this file before production deployment
- These credentials are for localhost testing only

---

## Troubleshooting

**If login fails:**
1. Ensure both servers are running (backend on 8000, frontend on 5000)
2. Check that sample data was loaded: `python3 manage.py shell < create_sample_data.py`
3. Verify user exists in admin panel
4. Try resetting password via Django admin

**To reset user password:**
```bash
cd backend
python3 manage.py shell
```
```python
from peacelink.users.models import User
user = User.objects.get(username='chief_makuei')
user.set_password('password123')
user.save()
```

---

**Last Updated:** November 28, 2025

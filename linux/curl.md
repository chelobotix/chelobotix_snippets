# CURL

```bash
curl -X POST \
  http://127.0.0.1:3000/nova/token_health \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "nova": {
      "token": "YOUR_TOKEN",
      "email": "YOUR_EMAIL"
    }
  }'
```

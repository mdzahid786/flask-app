# Use a lightweight Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /backend

# Copy requirements (if you have one)
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Expose port
#EXPOSE 5000

# Run Flask app
CMD ["python", "app.py"]

FROM python:3.14.0rc2-slim-trixie

WORKDIR /backend

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

COPY . .

#ENV PORT=5000

#EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
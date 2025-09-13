FROM node:22

# Working directory
WORKDIR /frontend

# copy dependies
COPY package*.json .
RUN npm install

COPY . .



# ENV PORT=8000
# ENV FRONTEND_URL=http://localhost
# ENV BACKEND_URL=http://localhost:5000

# EXPOSE 8000

CMD ["npm", "start"]


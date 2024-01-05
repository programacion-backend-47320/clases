# Definimos una imagen base
FROM node

# Crear una carpeta donde vamos a guardar el proyecto
WORKDIR /app

# Copiar los archivos de packages de nuestra carpeta local al /app
COPY package*.json ./

# Corremos el comando para instalar depencias
RUN npm install

# Tomamos el codigo del aplicativo y lo pegamos
COPY . .

# Habilitamos el puerto que escucha nuestra computadora
EXPOSE 8080

CMD ["npm", "start"]

# Se define la imagen base: NODE.
FROM node

# Se crea la carpeta interna para guardar el proyecto.
WORKDIR /app

# Se copia el archivo package.json a la nueva carpeta.
COPY package.json .

# Se ejecuta la instalación.
RUN npm install

# Se copia el código de la aplicación.
COPY . .

# Se define el puerto que se va a escuchar.
EXPOSE 8080

# Se establece el comando para que funcione la aplicación.
CMD ["npm","start"]
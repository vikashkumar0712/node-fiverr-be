FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm install --platform=linuxmusl --arch=x64 sharp
#COPY . .
RUN npm run build

EXPOSE 8002

ENTRYPOINT ["npm"]
CMD ["start"]


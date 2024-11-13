# Use the official Nginx image
FROM nginx:1.23

# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Remove any existing files in the working directory
RUN rm -rf ./*

# Copy the Angular build artifacts from the local machine to the Nginx server
COPY dist/art-of-code/ ./

# Copy the custom Nginx configuration file to the appropriate location
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the Nginx server
EXPOSE 80

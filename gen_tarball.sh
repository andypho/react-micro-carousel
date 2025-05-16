npm run format && \
npm run build && \
mkdir -p package && \
cp -r packages/react-micro-carousel/* package && \
tar -czf react-micro-carousel.tgz --exclude='package/node_modules' -C . package

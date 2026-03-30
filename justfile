default: build

build:
    npm run build
    npm run bundle
    echo "Did you add any new files to index.ts? Gotta do that to push an update"

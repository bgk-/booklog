# Booklog

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

## Setup

Prerequisites

- npm
- nx
- docker
- k3d

## Local Development

Repo setup

```
git clone ...
cd booklog
npm install
```

```
docker run mongo -p 27027:27017 -t booklog-db
MONGO_PORT=27027 npm run serve
```

Go to `http://localhost:3000` to view

## Local Deployment

1. Install k3d
2. Initialize a new cluster with appropriate port forwarded
   `k3d cluster create booklog -p "3000:32001@agent:0" --agents 2`
3. Build Docker images
   `nx docker-build api`
   `nx docker-build client`
4. Import images into k3d cluster
   `k3d image import booklog-api -c booklog -m direct`
   `k3d image import booklog-client -c booklog -m direct`
5. Ensure `kubectl` context is correct
   `kubectl config current-context #k3d-booklog`
6. Apply kubernetes resources
   `kubectl apply -f ./deploy/`

## Notes

- Normally you'd want to have an 'author' collection, but I opted to just go without for ease of implementation.
- Tests are minimal.
- kubernetes resources has no ingress, we are instead using a NodePort (not recommend for production).
- I wanted to try out k3d over minikube, but I think for long term use you'd want to set up the k3d registries so you don't need to import images manually.
- Validation is done at the form and model level, normally would have a validation pipe in the nest layer.
- Opted to write the api proxy manually rather than using a http-proxy package, giving more control is desired per route. 

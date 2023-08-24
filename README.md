# Booklog

A place to keep track of the books you've read.

![](https://github.com/bgk-/booklog/blob/main/assets/booklog.png)

## Setup

Prerequisites

- npm [(pnpm preferred)](https://pnpm.io)
- [nx](https://nx.dev)
- [docker](https://docker.com)
- [k3d](https://k3d.io)

## Project Structure

```
apps
  - api (root nest application)
  - client (root next application)
libs
  - api
    - books (nest book module)
    - mongo (nest mongo utilities)
  - client
    - components (next component library)
  - shared
    - types (typescript type declarations)
```

To extend the project use nx commands

- nest
  - library `nx g @nx/nest:lib api/[name]`
  - service `nx g @nx/nest:service [name] --project api-[project] --flat --directory lib`
  - controller `nx g @nx/nest:controller [name] --project api-[project] --flat --directory lib`
- next
  - library `nx g @nx/next:lib client/[name]`
  - component `nx g @nx/next:component [name] --project client/[name]`
  - page `nx g @nx/next:page [name] --project client/[page]`

## Local Development

Repo setup

```
git clone https://github.com/bgk-/booklog
cd booklog
pnpm install
```

```
docker run -d --name booklog-db -p 27027:27017 mongo
MONGO_PORT=27027 npm run serve
```

Go to [http://localhost:3000](http://localhost:3000) to view

## Local K8s Deployment

1. Install [k3d](https://k3d.io)
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
7. Verify resources are running
   `kubectl get po`

Go to [http://localhost:3000](http://localhost:3000) to view

## Notes

- Normally you'd want to have an 'author' collection, but I opted to just go without for ease of implementation.
- Tests are minimal to non-existent.
- kubernetes resources has no ingress, we are instead using a NodePort (not recommend for production).
- I wanted to try out k3d over minikube, if I were to set up the k3d registries so you don't need to import images manually it'd be much better.
- Validation is done at the form and model level, normally would have a validation pipe in the nest layer.
- Opted to write the api proxy manually rather than using a http-proxy package, giving more control if desired per route.
- Most generated content is kept as is, so there's a fair amount of leftovers.

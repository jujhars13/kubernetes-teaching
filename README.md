# kubernetes-teaching
Teaching Kubernetes 101 and 201 courses for various teams

- 2019-10-18 - BrumJs

## Prereqs
- GCP cloud login
- GCP [cli tools](https://cloud.google.com/sdk/) 
- Docker
- a good text editor (VS code, Atom)
- Docker [hub account](https://hub.docker.com)
- a proper machine or somebody with a proper machine
- git

## Docker Application Steps

### 1. Create a web application in either Go or Node

examples in `server/' directory
- [Go](server/main.go)
- [Node.js](server/index.js)

### 2. Publish Container to public Docker Hub

## Kubernetes Steps

- [X] Create a pod manifest
  - [x] Deploy pod
  - [X] inspect pod, describe pod
  - [x] Port forward into pod
  - [x] check pod logs
  - [x] delete pod
  - [x] re-deploy pod
  - [x] create namespace
  - [x] put pod into namespace
  - [x] delete your old pod

- [ ] How does Kuberentes work ?
  - Deploy kubelet `https://storage.googleapis.com/kubernetes-release/release/v1.0.3/bin/linux/amd64/kubelet`
  - point kubelet to a directory `./kubelet --config=${PWD}/manifests`
  - docker ps
  - Check kubelet info `curl localhost://10255/healthz`, `curl localhost://10255/spec`
  - tear down
- [x] Create a replica-set and deployment
  - [x] Deploy
  - [x] Port-forward into pod
  - [x] Tweak environment variables
  - [ ] Inject in vars via [configmap](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/)
  - [x] Scale up, scale down
  - [ ] Try different deployment types
  - [x] change code and re-deploy
  - [x] revert a deploy
- [x] Create a service manifest
  - [x] Deploy internal service
  - [x] deploy external layer 4 service
- [x] Create a GKE ingress controller
  - [x] Deploy and test
  - [x] Configure multiple routes to multiple services
- [ ] Extras
  - Create a cluster in AWS
  - cordon, drain and delete a node
  - look at helm


## Links
 - [deployment strategies](https://github.com/Signorini/k8s-deployment-strategies)

## Useful Commands

```bash

# mount volumes
docker run -it \
-v ${PWD}/app:/app \
myContainer

# env vars
docker run -it \
-e NODE_ENV=production \
myContainer

# To fire up an interactive pod into namespace
kubectl -n "${NAMESPACE}" run shell --rm -it --tty --image ubuntu -- bash

# scale a deployment
kubectl -n "${NAMESPACE}" scale --replicas=8 deployment potato-deployment

# roll back
kubectl -n "${NAMESPACE}" rollout undo deployment/potato-deployment

# all the things
kubectl -n "${NAMESPACE}" get all
```
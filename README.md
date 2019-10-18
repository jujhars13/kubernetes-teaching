# kubernetes-teaching
Teaching Kubernetes 101 and 201 courses

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

- [ ] Create a pod manifest
  - [ ] Deploy pod
  - [ ] inspect pod, describe pod
  - [ ] Port forward into pod
  - [ ] check pod logs
  - [ ] delete pod
  - [ ] re-deploy pod
  - [ ] create namespace
  - [ ] put pod into namespace
  - [ ] delete your old pod

- [ ] How does Kuberentes work ?
  - Deploy kubelet `https://storage.googleapis.com/kubernetes-release/release/v1.0.3/bin/linux/amd64/kubelet`
  - point kubelet to a directory `./kubelet --config=${PWD}/manifests`
  - docker ps
  - Check kubelet info `curl localhost://10255/healthz`, `curl localhost://10255/spec`
  - tear down
- [ ] Create a replica-set and deployment
  - [ ] Deploy
  - [ ] Port-forward into pod
  - [ ] Tweak environment variables
  - [ ] Inject in vars via [configmap](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/)
  - [ ] Scale up, scale down
  - [ ] Try different deployment types
  - [ ] change code and re-deploy
  - [ ] revert a deploy
- [ ] Create a service manifest
  - [ ] Deploy internal service
  - [ ] port forward into internal service
  - [ ] deploy external layer 4 service
- [ ] Create a GKE ingress controller
  - [ ] Deploy and test
  - [ ] Configure multiple routes to multiple services
- [ ] Extras
  - Create a cluster in AWS
  - cordon, drain and delete a node


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

```
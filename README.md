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
  - [ ] inspect pod
  - [ ] Port forward into pod
  - [ ] check pod logs
- [ ] Create a deployment
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
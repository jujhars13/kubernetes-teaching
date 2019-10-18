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

## Docker Application sSteps

### 1. Create a web application in either Go or Node

examples in `server/' directory
- [Go](server/main.go)
- [Node.js](server/index.js)

## Kubernetes Steps

### 1. Create a Kubernetes cluster in GKE

### 2. Setup command line tools to work with your GCP account

```bash
# authenticate the CLI tools with your account
gcloud auth login

# tell it which project to use
gcloud config set project merlingcp-203814

# install the plugin tools we'll need
gcloud components install kubectl
```

### 3. Configure Kubectl to talk to your cluster

```bash
# this will create an entry in the ~/.kube/config file
gcloud container clusters get-credentials <cluster-name> --zone us-central1-a --project merlingcp-203814

```

### 4. Dashboard Access

As of K8's 1.7+ we now have RBAC and dashboard access has been locked down, especially since the Tesla attack.
We don't really use the dashboard in prod anymore but it's really helpful when learning K8s to visualise things.

*We don't really use the dashboard in production any more, this is just for your learning*

```bash
# Create service account
kubectl create serviceaccount cluster-admin-dashboard-sa

# Bind ClusterAdmin role to the service account
kubectl create clusterrolebinding cluster-admin-dashboard-sa \
  --clusterrole=cluster-admin \
  --serviceaccount=default:cluster-admin-dashboard-sa

# get the login token for the new service account
TOKEN=$(kubectl describe secret $(kubectl -n kube-system get secret | awk '/^cluster-admin-dashboard-sa-token-/{print $1}') | awk '$1=="token:"{print $2}'); echo $TOKEN
```

### 5. Visit the dashboard

[http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/](http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/)

and inject in the token from above

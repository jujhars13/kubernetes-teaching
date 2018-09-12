# kubernetes-teaching
Teaching Kubernetes 101 and 201 courses

## Prereqs
- GCP cloud login
- GCP [cli tools](https://cloud.google.com/sdk/) 
- Docker
- a good text editor
- Docker [hub account](https://hub.docker.com)

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



### 3. Dashboard Access

As of K8's 1.7+ we now have RBAC and dashboard access has been locked down, especially since the Tesla attack.
We don't really use the dashboard in prod anymore but it's really helpful when learning K8s to visualise things

```bash
# Create service account
kubectl create serviceaccount cluster-admin-dashboard-sa

# Bind ClusterAdmin role to the service account
kubectl create clusterrolebinding cluster-admin-dashboard-sa \
  --clusterrole=cluster-admin \
  --serviceaccount=default:cluster-admin-dashboard-sa

# get the login token for the new service account
TOKEN=$(kubectl describe secret $(kubectl -n kube-system get secret | awk '/^cluster-admin-dashboard-sa-token-/{print $1}') | awk '$1=="token:"{print $2}')

echo $TOKEN
```
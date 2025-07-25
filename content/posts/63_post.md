+++
title = "63.  Learning Kubernetes Day 3"
date = 2024-01-01

+++
 
in k8s we use k8s manifest file. It is a YAML file.

YAML quick notes: We dont use TABS at all for indentation. We compulsarily have to use SPACE BARS.

k8s manifest files; manifest files basically is making a script out of the commands.

eg convert this command `kubectl run podz --image=nginx --namespace teama` into t YAML:

4 important keywords in manifest files:

1. kind - kind of resource you want to create like pod/namespace/ get form kubectl api-rsources
2. apiVersion
3. metadata - it is a dictionary, it has all details of the pods, label for a pod mandatory. labels are helpful for filterting. lables is a dictionary.
4. spec - here we define what is inside the pod, ie. the containers. containers are written as array. each - is a container

```yaml
    kind: Pod
    apiVersion: v1
    metadata:
     name: podz
     namespace: teama
     labels:
      app: myapp  #here both key and value are your choice
      project: teama
    spec:
     containers:
      - name: container1
        image: nginx
        ports:
         - containerPort: 80
      - here we can define container two
```

kubectl apply --filename podz.yaml will execute the yaml file.

going inside the terminal of a container inside a pod:
`kubectl exec -it pod-name -c containername -- /bin/bash`

Till here we dealt with a single pod definition. To make the application highly available we need to deploy multiple pods for the same applications. How to deploy multiple pods?
Let's say we want 5 pods in 2 VMs. How do we do it?

a kind: Pod definition allows creation of only 1 pod. We need to change that. Here comes in kubernetes controllers.
Kubernetes controllers are an abstraction layer around a single/group of pods for an app
Controller can create and manage a single/group od pods
Types of controllers:
1. ReplicaSet
2. DaemonSet
3. Deployment

Writing a yaml for controller:

```yaml
kind: ReplicaSet
apiVersion: apps/v1 
metadata: 
 name: pyapp
 namespace: default
 #labels: are optional
spec:
 replicas: 4
 selector: #isMandatory
   matchLabels:  #basically check if there are existing pods with the same labels and bring them under the control of replicaset
     app: myapp
     poject: teama
 template: #here we define the pod definition to create a pod
    metadata: #name, namespace and labels are important. labels are mandataroy. must be same as sselector
      #name: #how do we write 4 unique names here? we cant. thus k8s will auto generate the pod names to keep every pod name unique under a namespace.
      #namespace: we cant use this here because the controller will enforce it. 
      labels:
        app: myapp
        project: teama
    spec:
      containers:
        - name: container1
          image: nginx
          ports:
            - containerPort: 80
```

What are the benifits of controllers?

1. We can easily scale it, increase the number of pods. use scale command.
2. We can also scale down easily.

DaemonSet:
- Creates no. of pods == no. of worker nodes in a cluster.
- Daemonset will always ensure that every worker node has only one pod on it
- It cannot be scaled with scale command
- It autoscale when a new node is added to cluster
- Can auto scale down when a node is down

EVERY POD MUST HAVE A LABEL

Kubernetes services:

- Allows us to access app running inside a single/group of nodes

Types of service: ClusterIP, LoadBalancer, NodePort

```yaml
kind: Service
apiversion: v1
metadata:
  name: pyapp-svc
  namespace: default
  #labels: are optional
spec:
  type: CLusterIP #
  selector:
    app: pyapp
    project: teama

```

Way to access a pod is through its IP, but IP is dynamic, it changes everytime! How to ensure this IP is registered in LB?

Also learnt about Deployment. It is a controller that also provides rolling update/roll back feature on top of things that ReplicaSet provides.
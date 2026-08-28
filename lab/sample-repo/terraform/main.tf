# Local-only Terraform example — no cloud credentials required.
terraform {
  required_version = ">= 1.5.0"
}

resource "null_resource" "lab_marker" {
  triggers = {
    purpose = "engineering-lab-demo"
  }
}

output "message" {
  value = "This plan is local-only. No remote state or cloud provider is configured."
}

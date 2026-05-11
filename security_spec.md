# Security Specification - ICAAS

## Data Invariants
- **Leads**: 
  - Must stem from the contact form.
  - Required fields: `nombre`, `correo`, `celular`, `curso`, `createdAt`.
  - `createdAt` must be exactly the server timestamp.
  - Public can `create` (write) but NOT `read`, `update`, or `delete`.

## Security Rules Plan
- Default deny.
- `leads` collection:
  - `allow create`: If data matches schema and fields are exact.
  - Only admin (`hola@vuela-caas.com`) can read.

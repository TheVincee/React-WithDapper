import { FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "react-bootstrap";

export default function TableRow({ product, UpdateModal, DeleteModal }) {
  return (
    <tr key={product.id} className="align-middle">
      <td className="p-3">{product.id}</td>
      <td className="p-3">{product.name}</td>
      <td className="p-3">{product.sku}</td>
      <td className="p-3">${product.price}</td>
      <td className="p-3">{product.quantity}</td>
      <td className="p-3">
        <div className="d-flex align-items-center gap-2">
          <Button
            variant="outline-primary"
            className="d-flex align-items-center justify-content-center p-2 rounded-circle"
            onClick={UpdateModal}
          >
            <FaEdit />
          </Button>
          <Button
            variant="outline-danger"
            className="d-flex align-items-center justify-content-center p-2 rounded-circle"
            onClick={DeleteModal}
          >
            <FaTrash />
          </Button>
        </div>
      </td>
    </tr>
  );
}

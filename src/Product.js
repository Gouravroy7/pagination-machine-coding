export default function Product({ product }) {
  return (
    <div className="prod">
      <div>
        <img src={product.thumbnail} />
      </div>
      <div>{product.title}</div>
    </div>
  );
}

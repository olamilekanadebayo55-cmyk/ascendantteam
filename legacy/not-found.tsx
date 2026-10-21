import Link from "next/link";
export default function NotFound() {
  return (<><h1>Page not found</h1><p>The page or opportunity you were looking for is not available. It may have expired or been withdrawn.</p><Link className="btn" href="/opportunities">Browse opportunities</Link></>);
}

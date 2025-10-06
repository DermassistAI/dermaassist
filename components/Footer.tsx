export default function Footer() {
  return (
    <footer className="py-8">
      <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} DermAssist • Demo site
      </div>
    </footer>
  );
}

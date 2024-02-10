function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function LoginPage() {
  const navigation = [
    { name: "Dashboad", href: "#", current: true },
    { name: "Budget", href: "#", current: false },
    { name: "Projections", href: "#", current: false },
  ];

  return (
    <main>
      <h1>Login Page</h1>
      <p>Login to access your budget!</p>
      <a href="#">Link</a>

      {navigation.map((item) => {
        <a
          key={item.name}
          href={item.href}
          aria-current={item.current ? "page" : undefined}
        >
          {item.name}
        </a>;
      })}
    </main>
  );
}

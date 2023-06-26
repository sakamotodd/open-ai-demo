import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <header className="bg-blue-200">
        <nav className="flex h-screen flex-col gap-y-8 p-10">
          <Link href="/dashboard">サマリー</Link>
          <Link href="/dashboard/settings">設定</Link>
          <Link href="/" className="mt-auto">
            ログアウト
          </Link>
        </nav>
      </header>
      <div>{children}</div>
    </div>
  )
}

import Link from 'next/link'

export default function Settings() {
  return (
    <main className="mx-8 mt-8 flex flex-col gap-y-10">

      <nav className="flex gap-x-8">
        <Link href="/dashboard">サマリー</Link>
        <Link href="/dashboard/settings">設定</Link>
        <Link href="/">ログアウト</Link>
      </nav>
      <div className="flex gap-x-4">
        <label>名前</label>
        <input type="text" className="border-2 border-black" />
      </div>
    </main>
  )
}

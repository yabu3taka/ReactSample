import Link from 'next/link'

export default function Home() {
  return (
    <>
      <section>
        <Link href="/posts-link">1. Posts[ページ切替]</Link><br />
        <Link href="/posts-inpage">2. Posts[ページ移動なし]</Link><br />
        <Link href="/posts-server">3. Posts[useQuery]</Link><br />
        <Link href="/posts-api">4. Posts[REST API]</Link><br />
      </section>
      <hr />
      <section>
        <Link href="/sample/domref">Dom-Ref</Link><br />
        <Link href="/sample/rendering">レンダリング1</Link>　
        <Link href="/sample/rendering2">レンダリング2</Link>　
        <Link href="/sample/rendering3">レンダリング3</Link><br />
        <Link href="/sample/sc">ServerとClientの区切り</Link><br />
        {/* <Link href="/react.html">CreateRoot</Link><br /> */}
      </section>
      <hr />
      <section>
        NEXT_PUBLIC_API_PATH = {process.env.NEXT_PUBLIC_API_PATH}<br />
        <form>
          <input type="text" defaultValue="aaa" />
        </form>
      </section>
    </>
  );
}

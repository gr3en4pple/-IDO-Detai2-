# Bài tập "Block chain" đồ án nhóm 6 môn CCNTPTPM - CQ2020/3

### Lựa chọn đề tài 2 - Xây dựng hệ thống gọi vốn IDO (Decentralized Crowdfunding)

Production: [url](https://ido-detai-2.web.app/)
link demo: [url](https://www.youtube.com/watch?v=od9XtIKv0sk)

## Cài đặt

Sử dụng node v18 trở lên

### Hoặc

Sử dụng [nvm](https://github.com/nvm-sh/nvm) để switch version node thành 18

## Package manager

```bash
yarn
```

hoặc

```bash
npm install
```

### Sau khi hoàn thành quá trình cài đặt các packages

```bash
yarn dev
```

hoặc

```bash
npm run dev
```

## IDO là gì

IDO là một hình thức kêu gọi vốn sử dụng blockchain để tăng tính minh bạch và đảm bảo sự an toàn cho nhà đầu tư. Chủ dự án IDO sẽ kêu gọi một số tiền (có thể là token hoặc coin) cần được đầu tư nhất định, đổi lấy người đầu tư sẽ được nhận token hoặc coin của dự án.

## Techstack: React + Vite + NextUI + Wagmi + Connectkit

<p>
  Giao diện client được viết bằng thư viện <b>React</b> kết hợp với
  <b>Vite</b> build tool.
</p>
<p>
  <b>NextUI</b> là một thư viện với các component UI đã được tạo sẵn
</p>
<p>
  <b>Wagmi</b> là thư viện với các hooks và function giúp client giao tiếp
  với Blockchain chạy <b>Smart Contract</b>, nhờ đó có thể gọi các hàm
  Read và Write lên các <b>Smart Contract</b> đó.
</p>
<p>
  <b>Connectkit</b> là thư viện UI với các components giúp client
  <b>Connect Ví</b> với đa dạng các loại ví như Metamask, Okx Wallet,
  WalletConnect...
</p>


## Tài liệu tham khảo:

Smart Contract: [apeswap](https://github.com/apeswapfinance)
IDO UI: [winery]https://winery.finance/ido

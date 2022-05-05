# SMARTy Pay Client SDK
Simple library for show a custom payment button in any website

## Stable version link
```html
<script src="https://checkout.smartypay.io/sdk/smartypay-client-sdk-v1.js"></script>
```

## Demo
[Online demo](https://checkout.smartypay.io/sdk/smartypay-client-sdk-example.html)

## Build steps
### Clone repository into your dir
```shell
cd your_dir
git clone https://github.com/smarty-pay/smartypay-client-sdk
```

### Build
```shell
npm install
npm npm run build
```

### Usage on page
```html
<div id="smartypay"></div>
<script src="https://checkout.smartypay.io/sdk/smartypay-client-sdk-v1.js"></script>
<script>
new SmartyPayButton({
  target: 'smartypay',
  apiKey: 'YOUR_API_KEY',
  amount: '1.99',
  token: 'bUSDT',
  lang: 'en',
  theme: 'dark',
})
</script>
```
- **target** - element id
- **apiKey** - you can get it here: https://dashboard.smartypay.io/
- **token** - see valid tokens here: https://docs.smartypay.io/general/supported-tokens
- **amount** - amount for invoice (example 0.99)
- **lang** - `en` by default (also has `es`, `ru`)
- **theme** - `light` (default) or `dark`


## Full docs
Checkout our [TypeDocs](https://smarty-pay.github.io/smartypay-client-sdk/modules.html)
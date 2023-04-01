const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  // Kiểm tra tên đăng nhập và mật khẩu
  if (username === 'admin' && password === '123456') {
    alert('Đăng nhập thành công');
  } else {
    alert('Tên đăng nhập hoặc mật khẩu không đúng');
  }
});
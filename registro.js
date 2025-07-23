const supabaseUrl = 'https://xxx.supabase.co'; // reemplaza con tu URL real
const supabaseKey = 'public-anon-key'; // reemplaza con tu clave real
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const confirmError = document.getElementById('confirmError');
  const registroError = document.getElementById('registroError');
  const registroExito = document.getElementById('registroExito');

  confirmError.style.display = 'none';
  registroError.style.display = 'none';
  registroExito.style.display = 'none';

  if (password !== confirmPassword) {
    confirmError.style.display = 'block';
    return;
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nombre }
      }
    });

    if (error) {
      registroError.textContent = error.message;
      registroError.style.display = 'block';
    } else {
      registroExito.textContent = 'Registro exitoso. Revisa tu correo para verificar la cuenta.';
      registroExito.style.display = 'block';
      document.getElementById('registerForm').reset();
    }
  } catch (err) {
    registroError.textContent = 'Ocurrió un error inesperado.';
    registroError.style.display = 'block';
    console.error(err);
  }
});
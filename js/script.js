document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const el=document.querySelector(a.getAttribute('href'));if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'})}}));

// V02: abre sempre o PNG original. Clique na imagem ampliada alterna entre
// "caber na tela" e tamanho real (100%), útil para ler textos pequenos.
const lightbox=document.createElement('div');
lightbox.className='lightbox fit';
lightbox.innerHTML='<button class="lightbox-close" aria-label="Fechar">×</button><div class="lightbox-stage"><img alt="Tela ampliada do GO Ambiental Brasil"></div><div class="lightbox-caption"></div>';
document.body.appendChild(lightbox);
const lbImg=lightbox.querySelector('img');
const caption=lightbox.querySelector('.lightbox-caption');
const stage=lightbox.querySelector('.lightbox-stage');

function abrirImagem(img){
  lbImg.src=img.getAttribute('src');
  lbImg.alt=img.alt||'Tela do GO Ambiental Brasil';
  const fig=img.closest('figure');
  caption.textContent=(fig?.querySelector('figcaption')?.textContent||img.alt||'Tela do GO Ambiental Brasil')+' • clique para ver em tamanho real';
  lightbox.classList.add('open','fit');
  document.body.style.overflow='hidden';
}
function fecharImagem(){lightbox.classList.remove('open');document.body.style.overflow='';lbImg.removeAttribute('src')}

document.querySelectorAll('.shot img,.gallery img').forEach(img=>{
  img.loading='lazy';
  img.decoding='async';
  img.title='Clique para ampliar';
  img.addEventListener('click',()=>abrirImagem(img));
});
lightbox.querySelector('.lightbox-close').addEventListener('click',fecharImagem);
lightbox.addEventListener('click',e=>{if(e.target===lightbox||e.target===stage)fecharImagem()});
lbImg.addEventListener('click',e=>{
  e.stopPropagation();
  lightbox.classList.toggle('fit');
  caption.textContent=caption.textContent.replace(/ • clique.*$/,'')+(lightbox.classList.contains('fit')?' • clique para ver em tamanho real':' • tamanho real — clique para ajustar à tela');
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&lightbox.classList.contains('open'))fecharImagem()});

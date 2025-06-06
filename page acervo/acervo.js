// Estado da aplicação
let currentPage = 1;
const itemsPerPage = 10;
let filteredBooks = [];

// Dados dos livros
const livros = [
    { titulo: "O Senhor dos Anéis", genero: "Fantasia", autor: "J.R.R. Tolkien", ano: "1954", disponivel: true },
    { titulo: "Harry Potter e a Pedra Filosofal", genero: "Fantasia", autor: "J.K. Rowling", ano: "1997", disponivel: true },
    { titulo: "As Crônicas de Nárnia", genero: "Fantasia", autor: "C.S. Lewis", ano: "1950", disponivel: false },
    { titulo: "O Hobbit", genero: "Fantasia", autor: "J.R.R. Tolkien", ano: "1937", disponivel: true },
    { titulo: "Eragon", genero: "Fantasia", autor: "Christopher Paolini", ano: "2003", disponivel: true },
    { titulo: "O Mago", genero: "Fantasia", autor: "Raymond E. Feist", ano: "1982", disponivel: false },
    { titulo: "A Roda do Tempo", genero: "Fantasia", autor: "Robert Jordan", ano: "1990", disponivel: true },
    { titulo: "Mistborn: O Império Final", genero: "Fantasia", autor: "Brandon Sanderson", ano: "2006", disponivel: true },
    { titulo: "A Canção do Sangue", genero: "Fantasia", autor: "Anthony Ryan", ano: "2013", disponivel: false },
    { titulo: "A Fúria dos Reis", genero: "Fantasia", autor: "George R.R. Martin", ano: "1998", disponivel: true },
    { titulo: "O Nome do Vento", genero: "Fantasia", autor: "Patrick Rothfuss", ano: "2007", disponivel: true },
    { titulo: "A Guerra dos Tronos", genero: "Fantasia", autor: "George R.R. Martin", ano: "1996", disponivel: false },
    { titulo: "Dom Casmurro", genero: "Literatura Brasileira", autor: "Machado de Assis", ano: "1899", disponivel: true },
    { titulo: "O Cortiço", genero: "Literatura Brasileira", autor: "Aluísio Azevedo", ano: "1890", disponivel: true },
    { titulo: "Iracema", genero: "Romantismo", autor: "José de Alencar", ano: "1865", disponivel: true },
    { titulo: "O Guarani", genero: "Romantismo", autor: "José de Alencar", ano: "1857", disponivel: false },
    { titulo: "Memórias Póstumas de Brás Cubas", genero: "Realismo", autor: "Machado de Assis", ano: "1881", disponivel: true },
    { titulo: "A Moreninha", genero: "Romantismo", autor: "Joaquim Manuel de Macedo", ano: "1844", disponivel: true },
    { titulo: "1984", genero: "Ficção Científica", autor: "George Orwell", ano: "1949", disponivel: true },
    { titulo: "Admirável Mundo Novo", genero: "Ficção Científica", autor: "Aldous Huxley", ano: "1932", disponivel: false }
];

// Elementos do DOM
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsContainer = document.getElementById('resultsContainer');
const defaultImage = document.getElementById('defaultImage');

// Função para toggle do menu mobile
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    mobileMenu.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
}

// Função para scroll to section (placeholder)
function scrollToSection(section) {
    console.log('Scrolling to:', section);
}

// Função para filtrar livros
function filterBooks(query) {
    if (!query.trim()) {
        return [];
    }

    const queryLower = query.toLowerCase().trim();
    return livros.filter(livro => 
        livro.titulo.toLowerCase().includes(queryLower) ||
        livro.genero.toLowerCase().includes(queryLower) ||
        livro.autor.toLowerCase().includes(queryLower) ||
        livro.ano.includes(queryLower)
    );
}

// Função para calcular paginação
function calculatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    
    return { totalPages, startIndex, endIndex };
}

// Função para renderizar tabela
function renderTable(books, query) {
    const { totalPages, startIndex, endIndex } = calculatePagination(books.length);
    const currentItems = books.slice(startIndex, endIndex);

    if (books.length === 0) {
        return `
            <div class="no-results">
                <div class="no-results-emoji">📚</div>
                <div class="no-results-title">
                    Nenhum livro encontrado para "${query}"
                </div>
                <p class="no-results-text">
                    Tente buscar por outro título, autor, gênero ou ano
                </p>
            </div>
        `;
    }

    let tableHTML = `
        <div class="results-table">
            <div class="results-header">
                <h3 class="results-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                    </svg>
                    Resultados da Pesquisa
                </h3>
                <p class="results-count">
                    ${books.length} livro${books.length !== 1 ? 's' : ''} encontrado${books.length !== 1 ? 's' : ''}
                </p>
            </div>

            <div class="table-container">
                <table class="table">
                    <thead class="table-header">
                        <tr>
                            <th>
                                <div class="table-header-cell">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                                    </svg>
                                    Título
                                </div>
                            </th>
                            <th>
                                <div class="table-header-cell">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 2 2 7l10 5 10-5-10-5z"/>
                                        <path d="m2 17 10 5 10-5"/>
                                        <path d="m2 12 10 5 10-5"/>
                                    </svg>
                                    Gênero
                                </div>
                            </th>
                            <th>
                                <div class="table-header-cell">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                        <circle cx="12" cy="7" r="4"/>
                                    </svg>
                                    Autor(a)
                                </div>
                            </th>
                            <th>
                                <div class="table-header-cell">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                                        <line x1="16" x2="16" y1="2" y2="6"/>
                                        <line x1="8" x2="8" y1="2" y2="6"/>
                                        <line x1="3" x2="21" y1="10" y2="10"/>
                                    </svg>
                                    Ano
                                </div>
                            </th>
                            <th style="text-align: center;">Status</th>
                        </tr>
                    </thead>
                    <tbody class="table-body">
    `;

    currentItems.forEach((livro, index) => {
        tableHTML += `
            <tr>
                <td style="font-weight: 500; color: #111827;">${livro.titulo}</td>
                <td>
                    <span class="badge badge-secondary">${livro.genero}</span>
                </td>
                <td style="color: #374151;">${livro.autor}</td>
                <td style="color: #374151;">${livro.ano}</td>
                <td style="text-align: center;">
                    <span class="badge ${livro.disponivel ? 'badge-success' : 'badge-destructive'}">
                        ${livro.disponivel ? 'Disponível' : 'Emprestado'}
                    </span>
                </td>
            </tr>
        `;
    });

    tableHTML += `
                    </tbody>
                </table>
            </div>
    `;

    // Adicionar paginação se necessário
    if (totalPages > 1) {
        tableHTML += renderPagination(totalPages, books.length, startIndex, endIndex);
    }

    tableHTML += '</div>';
    return tableHTML;
}

// Função para renderizar paginação
function renderPagination(totalPages, totalItems, startIndex, endIndex) {
    let paginationHTML = `
        <div class="pagination-container">
            <nav class="pagination">
                <ul class="pagination-content">
                    <li class="pagination-item">
                        <button class="pagination-link pagination-prev ${currentPage === 1 ? 'disabled' : ''}" 
                                onclick="changePage(${Math.max(1, currentPage - 1)})">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="m15 18-6-6 6-6"/>
                            </svg>
                            Anterior
                        </button>
                    </li>
    `;

    // Páginas numeradas
    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - 1 && i <= currentPage + 1)
        ) {
            paginationHTML += `
                <li class="pagination-item">
                    <button class="pagination-link ${currentPage === i ? 'active' : ''}" 
                            onclick="changePage(${i})">
                        ${i}
                    </button>
                </li>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += `
                <li class="pagination-item">
                    <span class="pagination-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="1"/>
                            <circle cx="19" cy="12" r="1"/>
                            <circle cx="5" cy="12" r="1"/>
                        </svg>
                    </span>
                </li>
            `;
        }
    }

    paginationHTML += `
                    <li class="pagination-item">
                        <button class="pagination-link pagination-next ${currentPage === totalPages ? 'disabled' : ''}" 
                                onclick="changePage(${Math.min(totalPages, currentPage + 1)})">
                            Próximo
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="m9 18 6-6-6-6"/>
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>
            
            <p class="pagination-info">
                Mostrando ${startIndex + 1}-${endIndex} de ${totalItems} livros
            </p>
        </div>
    `;

    return paginationHTML;
}

// Função para mudar página
function changePage(page) {
    currentPage = page;
    performSearch();
}

// Função principal de busca
function performSearch() {
    const query = searchInput.value.trim();

    if (!query) {
        resultsContainer.classList.add('hidden');
        defaultImage.classList.remove('hidden');
        filteredBooks = [];
        return;
    }

    filteredBooks = filterBooks(query);
    const tableHTML = renderTable(filteredBooks, query);

    resultsContainer.innerHTML = tableHTML;
    resultsContainer.classList.remove('hidden');
    defaultImage.classList.add('hidden');
}

// Função para newsletter
function handleNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    alert(`Email ${email} cadastrado com sucesso!`);
    event.target.reset();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Busca em tempo real
    searchInput.addEventListener('input', function() {
        currentPage = 1; // Reset página quando busca mudar
        performSearch();
    });

    // Busca ao clicar no botão
    searchButton.addEventListener('click', performSearch);

    // Busca ao pressionar Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            currentPage = 1;
            performSearch();
        }
    });

    // Mostrar imagem padrão inicialmente
    if (!searchInput.value.trim()) {
        defaultImage.classList.remove('hidden');
    }
});

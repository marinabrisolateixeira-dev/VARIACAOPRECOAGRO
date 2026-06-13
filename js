// Banco de dados simulado com preços unitários por cooperativa
const dadosPrecos = {
    semente_soja: {
        nome: "Sementes de Soja (Saca)",
        bayer: 210,
        sulparana: 195,
        coamo: 205,
        copacol: 200
    },
    semente_milho: {
        nome: "Sementes de Milho (Saca)",
        bayer: 450,
        sulparana: 420,
        coamo: 435,
        copacol: 440
    },
    defensivo_glifosato: {
        nome: "Defensivo - Glifosato (Litro)",
        bayer: 45,
        sulparana: 38,
        coamo: 40,
        copacol: 42
    },
    defensivo_fungicida: {
        nome: "Defensivo - Fungicida (Litro)",
        bayer: 120,
        sulparana: 110,
        coamo: 115,
        copacol: 118
    }
};

let meuGrafico = null;

document.getElementById('agroForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede a página de recarregar

    // Captura os valores digitados pelo usuário
    const area = parseFloat(document.getElementById('area').value);
    const produtoChave = document.getElementById('produto').value;

    if (!area || !produtoChave) return;

    const infoProduto = dadosPrecos[produtoChave];

    // Simulação de cálculo: Assumindo que o gasto médio seja de 1 unidade do insumo por hectare
    // Multiplicamos a área pelo preço unitário de cada cooperativa
    const custoBayer = area * infoProduto.bayer;
    const custoSulparana = area * infoProduto.sulparana;
    const custoCoamo = area * infoProduto.coamo;
    const custoCopacol = area * infoProduto.copacol;

    // Atualiza o texto descritivo
    document.getElementById('chartDescription').innerText = `Mostrando a estimativa de custo total para ${area} hectares utilizando ${infoProduto.nome}.`;

    // Exibe a seção do gráfico que estava oculta
    const sectionGrafico = document.querySelector('.chart-section');
    sectionGrafico.style.display = 'block';

    // Se o gráfico já existir, destrói para criar um novo com os novos dados
    if (meuGrafico) {
        meuGrafico.destroy();
    }

    // Configuração e renderização do gráfico usando Chart.js
    const ctx = document.getElementById('pricesChart').getContext('2d');
    meuGrafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Bayer', 'Sulparaná', 'Coamo', 'Copacol'],
            datasets: [{
                label: 'Custo Total Estimado (R$)',
                data: [custoBayer, custoSulparana, custoCoamo, custoCopacol],
                backgroundColor: [
                    '#0b2512', // Verde escuro para o primeiro colocado
                    '#1c4e29', 
                    '#2d7741', 
                    '#111111'  // Preto para diferenciar
                ],
                borderColor: '#111111',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Valor em Reais (R$)',
                        font: { weight: 'bold' }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Cooperativas / Fornecedores',
                        font: { weight: 'bold' }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // Oculta a legenda superior já que o título do eixo basta
                }
            }
        }
    });

    // Rola a tela suavemente até o gráfico gerado
    sectionGrafico.scrollIntoView({ behavior: 'smooth' });
});

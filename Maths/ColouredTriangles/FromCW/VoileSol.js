function triangle(row) {
    row = [...row].map(c => 'RGB'.indexOf(c));
    var c = 0, n = row.length;
    const c3 = (n, i) => n || i ? ([[1, 0, 0], [1, 1, 0], [1, 2, 1]][n % 3][i % 3] * c3(n / 3 | 0, i / 3 | 0)) % 3 : 1;
    for (let i = 0; i < n; i++) c = (c + row[i] * c3(n - 1, i)) % 3;
    return 'RGB'[n % 2 ? c : (3 - c) % 3];
  }
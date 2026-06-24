#!/usr/bin/env node
/**
 * Accessibility audit script using axe-core via axe-playwright.
 * Run: node scripts/a11y-test.js
 * Requires: npm install -D @axe-core/playwright playwright
 */
import { chromium } from 'playwright'
import { checkA11y, injectAxe } from 'axe-playwright'

const BASE = 'http://localhost:4173/refugio-sensorial'

const ROUTES = [
  { path: '/',            name: 'Inicio' },
  { path: '/kit',         name: 'Kit Sensorial' },
  { path: '/kit/senales', name: 'Señales previas' },
  { path: '/kit/recursos',name: 'Recursos' },
  { path: '/mapa',        name: 'Mapa silencioso' },
  { path: '/biblioteca',  name: 'Herramientas' },
  { path: '/ayuda',       name: 'Ayuda en crisis' },
]

const AXEOPTS = {
  axeOptions: {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'],
    },
  },
  violationCallback: (violations) => {
    if (!violations.length) return
    console.error(`\n  ${violations.length} violations found:\n`)
    violations.forEach((v, i) => {
      console.error(`  [${i + 1}] ${v.id} — ${v.impact?.toUpperCase()} — ${v.description}`)
      v.nodes.forEach(n => {
        console.error(`       → ${n.target.join(' > ')}`)
        if (n.failureSummary) console.error(`         ${n.failureSummary.split('\n')[0]}`)
      })
    })
  },
}

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  let totalViolations = 0
  const results = []

  for (const route of ROUTES) {
    process.stdout.write(`  Checking ${route.name} (${route.path})... `)
    await page.goto(`${BASE}${route.path}`, { waitUntil: 'networkidle' })
    await injectAxe(page)

    try {
      await checkA11y(page, null, { ...AXEOPTS, detailedReport: false })
      console.log('PASS')
      results.push({ route, violations: 0 })
    } catch (err) {
      const count = (err.message.match(/(\d+) accessibility/)?.[1]) ?? '?'
      console.log(`FAIL (${count} violations)`)
      totalViolations += parseInt(count, 10) || 0
      results.push({ route, violations: count })
    }
  }

  await browser.close()

  console.log('\n─────────────────────────────────────')
  console.log(`  Total violations: ${totalViolations}`)
  console.log('─────────────────────────────────────\n')

  if (totalViolations > 0) process.exit(1)
})()

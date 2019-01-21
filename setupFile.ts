import { JSDOM } from 'jsdom'

const globalAny: any = global

const documentHTML = '<!DOCTYPE html><html><body><div id="root"></div></body></html>'
globalAny.document = new JSDOM(documentHTML).window.document

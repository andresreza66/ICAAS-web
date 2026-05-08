/**
 * Instrucciones:
 * 1. Ve a Google Sheets y crea una nueva hoja de cálculo.
 * 2. En la hoja, añade las siguientes columnas en la fila 1:
 *    A1: Fecha
 *    B1: Nombre
 *    C1: Correo
 *    D1: Celular
 *    E1: Curso
 *    F1: Mensaje
 * 3. Ve al menú Extensiones > Apps Script.
 * 4. Borra el código existente y pega este código completo.
 * 5. Haz clic en "Implementar" -> "Nueva implementación".
 * 6. Tipo: "Aplicación web".
 * 7. Ejecutar como: "Tú" (tu cuenta).
 * 8. Quién tiene acceso: "Cualquier persona".
 * 9. Haz clic en "Implementar" (tal vez pida autorizar permisos).
 * 10. Copia la "URL de la aplicación web".
 * 11. Pega esa URL en AI Studio (en Configuración / Environment Variables o usando el menú lateral) 
 *     como el valor para VITE_GOOGLE_SHEETS_URL.
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = e.parameter;
    
    // Si los datos vienen de FormData directamente
    const nombre = data.nombre || '';
    const correo = data.correo || '';
    const celular = data.celular || '';
    const curso = data.curso || '';
    const mensaje = data.mensaje || '';
    const fecha = data.fecha || new Date().toLocaleString();
    
    sheet.appendRow([
      fecha,
      nombre,
      correo,
      celular,
      curso,
      mensaje
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

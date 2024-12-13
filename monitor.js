import mysql from 'mysql';
import axios from 'axios';

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smart_locker'
});

// Configuración del bot de Telegram
const TELEGRAM_TOKEN = '7404841570:AAFJ-p-mmfFitF4xm5doTokGIxpau7a1AFQ';
const CHAT_ID = '-4507889941';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

// Función para enviar mensaje a Telegram
const sendTelegramMessage = async (message) => {
    try {
        await axios.post(TELEGRAM_API_URL, {
            chat_id: CHAT_ID,
            text: message
        });
        console.log('Mensaje enviado a Telegram:', message);
    } catch (error) {
        console.error('Error al enviar el mensaje a Telegram:', error);
    }
};

// Función para verificar nuevos registros
const checkNewRecords = async () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT p.id, tp.tipo AS tipo_paquete, r.nombres, r.apellidos, r.numero_apartamento, p.fecha_registro FROM paquete p JOIN tipo_paquete tp ON p.tipo_paquete_id = tp.id JOIN residentes r ON p.residentes_cedula = r.cedula WHERE p.processed = FALSE', (error, results) => {
            if (error) {
                return reject('Error al realizar la consulta: ' + error);
            }

            results.forEach(record => {
                const message = `Nuevo paquete registrado:\n\nTipo de Paquete: ${record.tipo_paquete}\nResidente: ${record.nombres} ${record.apellidos}\nNúmero de Apartamento: ${record.numero_apartamento}\nFecha de Registro: ${record.fecha_registro}`;
                sendTelegramMessage(message)
                    .then(() => {
                        // Marcar el registro como procesado después de enviar el mensaje
                        db.query('UPDATE paquete SET processed = TRUE WHERE id = ?', [record.id], (updateError) => {
                            if (updateError) {
                                console.error('Error al marcar el registro como procesado:', updateError);
                            }
                        });
                    })
                    .catch(console.error);
            });

            resolve();
        });
    });
};

// Función principal
const main = async () => {
    try {
        console.log('Conectado a la base de datos MySQL');
        await checkNewRecords();
    } catch (error) {
        console.error('Error:', error);
    }
};

// Ejecutar la función principal cada 10 segundos
setInterval(main, 10000);

/**
 * Rate Limiter en Memoria (Simple Token Bucket)
 * Ideal para workshops o uso moderado. 
 * NOTA: En arquitecturas Serverless puras (Vercel) el estado en memoria no se comparte entre
 * diferentes contenedores/instancias corriendo en paralelo. Aún así, es efectivo para frenar 
 * abusos desde una misma IP al mismo worker, a cero costo.
 */

interface RateLimitTracker {
  count: number;
  resetTime: number;
}

const rateLimiterStore = new Map<string, RateLimitTracker>();

export function rateLimit(
  ip: string,
  limit: number = 10,       // Cantidad de request permitidas en la ventana
  windowMs: number = 60000  // Ventana de tiempo (1 minuto por defecto)
): { success: boolean; limit: number; remaining: number; reset: number } {
  
  const now = Date.now();
  const record = rateLimiterStore.get(ip);

  // Si no existe o la ventana expiró, crear un nuevo récord
  if (!record || now > record.resetTime) {
    rateLimiterStore.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    
    // Limpieza de claves viejas de vez en cuando (Garage Collector simple manual)
    if (rateLimiterStore.size > 5000) {
      for (const [key, value] of rateLimiterStore.entries()) {
        if (now > value.resetTime) rateLimiterStore.delete(key);
      }
    }

    return { 
      success: true, 
      limit, 
      remaining: limit - 1, 
      reset: now + windowMs 
    };
  }

  // Si existe en la ventana de tiempo
  if (record.count >= limit) {
    return { 
      success: false, 
      limit, 
      remaining: 0, 
      reset: record.resetTime 
    };
  }

  record.count += 1;
  
  return { 
    success: true, 
    limit, 
    remaining: limit - record.count, 
    reset: record.resetTime 
  };
}

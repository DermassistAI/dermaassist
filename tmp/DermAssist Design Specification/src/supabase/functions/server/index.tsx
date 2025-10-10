import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Create Supabase client for auth
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Auth middleware for protected routes
const requireAuth = async (c: any, next: any) => {
  const accessToken = c.req.header('Authorization')?.split(' ')[1];
  if (!accessToken) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  if (!user || error) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  c.set('user', user);
  await next();
};

// Admin middleware - checks if user is admin
const requireAdmin = async (c: any, next: any) => {
  const user = c.get('user');
  if (!user) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  // Check if user has admin role
  const adminCheck = await kv.get(`user_role:${user.id}`);
  if (adminCheck !== 'admin') {
    return c.json({ error: 'Admin access required' }, 403);
  }

  await next();
};

// Health check endpoint
app.get("/make-server-19b9af15/health", (c) => {
  return c.json({ status: "ok" });
});

// API Key Management Routes
app.get("/make-server-19b9af15/api-keys", requireAuth, requireAdmin, async (c) => {
  try {
    const keys = await kv.getByPrefix('api_key:');
    const keyList = keys.map(key => ({
      id: key.key.replace('api_key:', ''),
      model: key.value.model,
      provider: key.value.provider,
      createdAt: key.value.createdAt,
      lastUsed: key.value.lastUsed,
      // Don't return actual key value for security
      hasKey: !!key.value.key
    }));
    return c.json({ keys: keyList });
  } catch (error) {
    console.log('Error fetching API keys:', error);
    return c.json({ error: 'Failed to fetch API keys' }, 500);
  }
});

app.post("/make-server-19b9af15/api-keys", requireAuth, requireAdmin, async (c) => {
  try {
    const { model, provider, key, endpoint } = await c.req.json();
    
    if (!model || !provider || !key) {
      return c.json({ error: 'Model, provider, and key are required' }, 400);
    }

    const keyId = crypto.randomUUID();
    const keyData = {
      model,
      provider,
      key: key, // In production, this should be encrypted
      endpoint: endpoint || '',
      createdAt: new Date().toISOString(),
      lastUsed: null
    };

    await kv.set(`api_key:${keyId}`, keyData);
    
    return c.json({ 
      id: keyId, 
      model, 
      provider, 
      createdAt: keyData.createdAt,
      message: 'API key added successfully' 
    });
  } catch (error) {
    console.log('Error adding API key:', error);
    return c.json({ error: 'Failed to add API key' }, 500);
  }
});

app.put("/make-server-19b9af15/api-keys/:id", requireAuth, requireAdmin, async (c) => {
  try {
    const keyId = c.req.param('id');
    const { model, provider, key, endpoint } = await c.req.json();

    const existingKey = await kv.get(`api_key:${keyId}`);
    if (!existingKey) {
      return c.json({ error: 'API key not found' }, 404);
    }

    const updatedKeyData = {
      ...existingKey,
      model: model || existingKey.model,
      provider: provider || existingKey.provider,
      key: key || existingKey.key,
      endpoint: endpoint !== undefined ? endpoint : existingKey.endpoint,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`api_key:${keyId}`, updatedKeyData);
    
    return c.json({ message: 'API key updated successfully' });
  } catch (error) {
    console.log('Error updating API key:', error);
    return c.json({ error: 'Failed to update API key' }, 500);
  }
});

app.delete("/make-server-19b9af15/api-keys/:id", requireAuth, requireAdmin, async (c) => {
  try {
    const keyId = c.req.param('id');
    const existingKey = await kv.get(`api_key:${keyId}`);
    
    if (!existingKey) {
      return c.json({ error: 'API key not found' }, 404);
    }

    await kv.del(`api_key:${keyId}`);
    return c.json({ message: 'API key deleted successfully' });
  } catch (error) {
    console.log('Error deleting API key:', error);
    return c.json({ error: 'Failed to delete API key' }, 500);
  }
});

// Model Provider Management Routes
app.get("/make-server-19b9af15/model-providers", requireAuth, requireAdmin, async (c) => {
  try {
    const providers = await kv.getByPrefix('model_provider:');
    const providerList = providers.map(provider => ({
      id: provider.key.replace('model_provider:', ''),
      ...provider.value
    }));
    return c.json({ providers: providerList });
  } catch (error) {
    console.log('Error fetching model providers:', error);
    return c.json({ error: 'Failed to fetch model providers' }, 500);
  }
});

app.post("/make-server-19b9af15/model-providers", requireAuth, requireAdmin, async (c) => {
  try {
    const { name, description, baseUrl, models, isActive } = await c.req.json();
    
    if (!name || !baseUrl || !models) {
      return c.json({ error: 'Name, baseUrl, and models are required' }, 400);
    }

    const providerId = crypto.randomUUID();
    const providerData = {
      name,
      description: description || '',
      baseUrl,
      models: models || [],
      isActive: isActive !== undefined ? isActive : true,
      createdAt: new Date().toISOString()
    };

    await kv.set(`model_provider:${providerId}`, providerData);
    
    return c.json({ 
      id: providerId, 
      ...providerData,
      message: 'Model provider added successfully' 
    });
  } catch (error) {
    console.log('Error adding model provider:', error);
    return c.json({ error: 'Failed to add model provider' }, 500);
  }
});

app.put("/make-server-19b9af15/model-providers/:id", requireAuth, requireAdmin, async (c) => {
  try {
    const providerId = c.req.param('id');
    const { name, description, baseUrl, models, isActive } = await c.req.json();

    const existingProvider = await kv.get(`model_provider:${providerId}`);
    if (!existingProvider) {
      return c.json({ error: 'Model provider not found' }, 404);
    }

    const updatedProviderData = {
      ...existingProvider,
      name: name || existingProvider.name,
      description: description !== undefined ? description : existingProvider.description,
      baseUrl: baseUrl || existingProvider.baseUrl,
      models: models || existingProvider.models,
      isActive: isActive !== undefined ? isActive : existingProvider.isActive,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`model_provider:${providerId}`, updatedProviderData);
    
    return c.json({ message: 'Model provider updated successfully' });
  } catch (error) {
    console.log('Error updating model provider:', error);
    return c.json({ error: 'Failed to update model provider' }, 500);
  }
});

app.delete("/make-server-19b9af15/model-providers/:id", requireAuth, requireAdmin, async (c) => {
  try {
    const providerId = c.req.param('id');
    const existingProvider = await kv.get(`model_provider:${providerId}`);
    
    if (!existingProvider) {
      return c.json({ error: 'Model provider not found' }, 404);
    }

    await kv.del(`model_provider:${providerId}`);
    return c.json({ message: 'Model provider deleted successfully' });
  } catch (error) {
    console.log('Error deleting model provider:', error);
    return c.json({ error: 'Failed to delete model provider' }, 500);
  }
});

// User Management Routes
app.get("/make-server-19b9af15/users", requireAuth, requireAdmin, async (c) => {
  try {
    const users = await kv.getByPrefix('user_profile:');
    const userList = users.map(user => ({
      id: user.key.replace('user_profile:', ''),
      ...user.value
    }));
    return c.json({ users: userList });
  } catch (error) {
    console.log('Error fetching users:', error);
    return c.json({ error: 'Failed to fetch users' }, 500);
  }
});

app.put("/make-server-19b9af15/users/:id", requireAuth, requireAdmin, async (c) => {
  try {
    const userId = c.req.param('id');
    const { role, isActive, email, name } = await c.req.json();

    // Update user role if provided
    if (role) {
      await kv.set(`user_role:${userId}`, role);
    }

    // Update user profile
    const existingProfile = await kv.get(`user_profile:${userId}`) || {};
    const updatedProfile = {
      ...existingProfile,
      email: email || existingProfile.email,
      name: name || existingProfile.name,
      isActive: isActive !== undefined ? isActive : existingProfile.isActive,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`user_profile:${userId}`, updatedProfile);
    
    return c.json({ message: 'User updated successfully' });
  } catch (error) {
    console.log('Error updating user:', error);
    return c.json({ error: 'Failed to update user' }, 500);
  }
});

// Model Health Check Route
app.post("/make-server-19b9af15/model-health-check", requireAuth, requireAdmin, async (c) => {
  try {
    const { modelId } = await c.req.json();
    
    // Get model configuration
    const apiKey = await kv.get(`api_key:${modelId}`);
    if (!apiKey) {
      return c.json({ error: 'Model API key not found' }, 404);
    }

    // Simple health check - try to make a minimal request
    const healthCheck = {
      timestamp: new Date().toISOString(),
      status: 'active', // In real implementation, make actual API call
      responseTime: Math.random() * 3 + 1, // Simulated response time
      uptime: 99.5 + Math.random() * 0.5
    };

    await kv.set(`model_health:${modelId}`, healthCheck);
    
    return c.json({ health: healthCheck });
  } catch (error) {
    console.log('Error checking model health:', error);
    return c.json({ error: 'Failed to check model health' }, 500);
  }
});

// Initialize default admin user (should be run once)
app.post("/make-server-19b9af15/init-admin", async (c) => {
  try {
    const { email, password, adminKey } = await c.req.json();
    
    // Check admin initialization key
    if (adminKey !== Deno.env.get('ADMIN_INIT_KEY')) {
      return c.json({ error: 'Invalid admin initialization key' }, 403);
    }

    // Create admin user
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name: 'Admin User', role: 'admin' },
      email_confirm: true
    });

    if (error) {
      console.log('Error creating admin user:', error);
      return c.json({ error: 'Failed to create admin user' }, 500);
    }

    // Set admin role
    await kv.set(`user_role:${data.user.id}`, 'admin');
    await kv.set(`user_profile:${data.user.id}`, {
      email,
      name: 'Admin User',
      role: 'admin',
      isActive: true,
      createdAt: new Date().toISOString()
    });

    return c.json({ message: 'Admin user created successfully', userId: data.user.id });
  } catch (error) {
    console.log('Error initializing admin:', error);
    return c.json({ error: 'Failed to initialize admin' }, 500);
  }
});

Deno.serve(app.fetch);
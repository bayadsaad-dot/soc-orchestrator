from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DATABASE_URL: str

    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    VT_API_KEY: str | None = None

    WAZUH_API_URL: str | None = None
    WAZUH_USERNAME: str | None = None
    WAZUH_PASSWORD: str | None = None

    WAZUH_INDEXER_URL: str | None = None
    WAZUH_INDEXER_USERNAME: str | None = None
    WAZUH_INDEXER_PASSWORD: str | None = None

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()